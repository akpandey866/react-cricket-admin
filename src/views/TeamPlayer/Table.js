import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSmartTable,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { toast } from 'react-toastify'

import ToastComponent from 'src/components/common/TaostComponent.js'
import TeamPlayerService from 'src/service/TeamPlayerService'
import { useParams } from 'react-router-dom'
const Table = (props) => {
  const [loading, setLoading] = useState()
  const [activePage, setActivePage] = useState(1)
  const [columnFilter, setColumnFilter] = useState([])
  const [columnSorter, setColumnSorter] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(100)
  const [users, setUsers] = useState({})
  const [pickedPlayer, setPickedPlayer] = useState(props.pickedPlayer)
  const urlParams = useParams()
  const [details, setDetails] = useState([])
  const columns = [
    {
      label: 'SN',
      key: 'sn',
      filter: false,
    },
    { label: 'Player Name', filter: false, key: 'full_name' },
    { key: 'team_name', filter: false, sorting: false },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]
  const toggleDetails = (index) => {
    setLoading(true)
    const position = details.indexOf(index)
    const fixtureId = urlParams.fixtureId
    const playerId = index
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
      TeamPlayerService.deleteTeamPlayer(playerId, fixtureId).then((res) => {
        if (res.status === 200) {
          setLoading(false)
          toast.dismiss()
          setPickedPlayer(res.picked_player)
          ToastComponent(res.message, 'success')
        }
      })
    } else {
      newDetails = [...details, index]
    }

    setDetails(newDetails)
    TeamPlayerService.addInstantPlayer(playerId, fixtureId).then((res) => {
      if (res.status === 200) {
        toast.dismiss()
        ToastComponent(res.message, 'success')
        setPickedPlayer(res.picked_player)
        setLoading(false)
      }
    })
  }

  const getUsers = useEffect(() => {
    setLoading(true)
    const offset = itemsPerPage * activePage - itemsPerPage
    let params = new URLSearchParams()
    Object.keys(columnFilter).forEach((key) => {
      params.append(key, columnFilter[key])
    })
    columnSorter &&
      columnSorter.column !== undefined &&
      params.append('sort', `${columnSorter.column}%${columnSorter.state}`)

    TeamPlayerService.getTeamPlayer(
      offset,
      itemsPerPage,
      activePage,
      params,
      urlParams.fixtureId,
    ).then((result) => {
      setUsers(result.data)
      setPickedPlayer(result.picked_player)
      const layerIds = result.picked_player.map((l) => l.player_id)
      setDetails(layerIds)

      setLoading(false)
    })
  }, [activePage, columnFilter, columnSorter, itemsPerPage, props, urlParams.fixtureId])
  return (
    <>
      <CRow>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Players</strong>
            </CCardHeader>
            <CCardBody>
              <CSmartTable
                columns={columns}
                columnFilter={{
                  external: true,
                }}
                columnSorter={{
                  external: true,
                }}
                scopedColumns={{
                  sn: (item, number) => <td>{++number}</td>,
                  show_details: (item, number) => {
                    return (
                      <>
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              toggleDetails(item.id)
                            }}
                          >
                            {details.includes(item.id) ? 'Remove' : 'Add'}
                          </CButton>
                        </td>
                      </>
                    )
                  },
                }}
                items={users.data}
                itemsPerPage={itemsPerPage}
                itemsPerPageSelect={false}
                loading={loading}
                pagination={false}
                paginationProps={false}
                tableProps={{
                  hover: true,
                  responsive: true,
                }}
                onActivePageChange={(activePage) => setActivePage(activePage)}
                onColumnFilterChange={(filter) => {
                  setActivePage(1)
                  setColumnFilter(filter)
                }}
                onItemsPerPageChange={(itemsPerPage) => {
                  setActivePage(1)
                  setItemsPerPage(itemsPerPage)
                }}
                onSorterChange={(sorter) => setColumnSorter(sorter)}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Picked Players</strong>
            </CCardHeader>
            <CCardBody>
              <CTable striped responsive={true}>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Player Name</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {pickedPlayer &&
                    pickedPlayer.map((item, key) => (
                      <CTableRow key={key}>
                        <CTableHeaderCell scope="row">{item.player_name}</CTableHeaderCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Table