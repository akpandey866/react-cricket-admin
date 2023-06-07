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
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react-pro'
import { toast } from 'react-toastify'

import ToastComponent from 'src/components/common/TaostComponent.js'
import TeamPlayerService from 'src/service/TeamPlayerService'
import { useParams } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilMinus, cilPlus } from '@coreui/icons'
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
      key: 'show_details',
      label: 'Pick',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
    { label: 'Player Name', filter: false, key: 'full_name' },
    { key: 'team_name', filter: false, sorting: false },
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
        <CAccordion activeItemKey={1} className={`${props.individualPlayerDisplay}`}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              {' '}
              <strong>Add Individual Players</strong>
            </CAccordionHeader>
            <CAccordionBody>
              <CSmartTable
                columns={columns}
                columnFilter={{
                  external: true,
                }}
                columnSorter={{
                  external: true,
                }}
                scopedColumns={{
                  show_details: (item, number) => {
                    return (
                      <>
                        <td className="py-2">
                          <CButton
                            color={details.includes(item.id) ? 'danger' : 'success'}
                            // variant="outline"
                            shape="square"
                            onClick={() => {
                              toggleDetails(item.id)
                            }}
                          >
                            {details.includes(item.id) ? (
                              <CIcon icon={cilMinus} />
                            ) : (
                              <CIcon icon={cilPlus} />
                            )}
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
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>

        <CAccordion activeItemKey={1}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              {' '}
              <strong>Squad (Picked Players)</strong>
            </CAccordionHeader>
            <CAccordionBody>
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
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </CRow>
    </>
  )
}

export default Table
