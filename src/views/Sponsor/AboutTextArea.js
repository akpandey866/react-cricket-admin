import React from 'react'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import { useState } from 'react'
import { useEffect } from 'react'
import SponsorService from 'src/service/SponsorService'
const AboutTextArea = (props) => {
  console.log('sponsrif ie', props.sponsorId)
  const [aboutDetails, setAboutDetails] = useState()
  useEffect(() => {
    SponsorService.getSponsorDetail(props.sponsorId).then((res) => {
      if (res.status === 200) {
        setAboutDetails(res.user_details)
      }
    })
  }, [props])
  const [description, setDescription] = useState({
    htmlValue: 'asdasasd',
    editorState: EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML('asdasasd')),
    ),
  })

  const onEditorStateChange = (editorValue) => {
    const editorStateInHtml = draftToHtml(convertToRaw(editorValue.getCurrentContent()))

    setDescription({
      htmlValue: editorStateInHtml,
      editorState: editorValue,
    })
  }
  return (
    <Editor
      toolbarHidden={false}
      editorState={description.editorState}
      onEditorStateChange={onEditorStateChange}
      editorStyle={{ border: '1px solid', height: '150px' }}
    />
  )
}

export default AboutTextArea
