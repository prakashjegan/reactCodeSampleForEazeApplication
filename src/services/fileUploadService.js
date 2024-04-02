import urls from "../config/urls"
import request from "../xhr"
import responseParser from "../utils/parser"
import axios from "axios"

const gets3ConfigUrl = (event, code) =>
   request({
      method: "get",
      url: `${urls({ event , code }).s3config}`,
      secure: true,
      transformResponse: [responseParser]
   })

   const gets3PublicConfigUrl = (event, code) =>
   request({
      method: "get",
      url: `${urls({ event , code }).s3Publicconfig}`,
      secure: true,
      transformResponse: [responseParser]
   })

   const uploadFileAWSUrl = async (e , updateLink , documentLink1, isPublic ,setLoading) => {
      setLoading(true)
      if (e.file.status === "removed") {
          //setupdateData({ ...setupdateData, uploadLink: "" })
          //documentLink.delete(e.file.uid)
          let temp = new Map([...documentLink1])
          temp.delete(e.file.uid)
          console.log('Into Get AWS Urls documentLink1', temp)
          updateLink(documentLink1 , false , e)
      } else {
          try {
              console.log('File Status', e.file.status)
              console.log(e.file)
              // file.preventDefault() 
              const j = await ((isPublic ) ? gets3PublicConfigUrl(e.file.name, 'chat') :gets3ConfigUrl(e.file.name, 'chat'))
              console.log('SignedUrl', j)
              console.log('Signed Url ABC j.data ', j.data)
              console.log(j.data.message)
              const response = await axios.put(decodeURIComponent(j.data.message), e.file, {
                  headers: { "Content-Type": "multipart/form-data" }
              })
              console.log('Into File Upload Data :::: ' , response)
              if (response.status === 200) {
                  let str = decodeURIComponent(j.data.message.split("?")[0])
                  //setupdateData = { ...setupdateData, uploadLink: str }
                  //setShareLink(str)
                  let documentLink = new Map()
                  let file = {
                     uid: ''+e.file.uid,
                     name: e.file.name,
                     status: 'done',
                     url: str,
                     processed:'done',
      }
               documentLink1.set(e.file.uid, file)
                  console.log('documentLink1 MessageDetails Into Aws Urls Document linkt add documentLink1:::;', documentLink1)
                  updateLink(documentLink1 , true , e)
                  setLoading(false)
                  return true || Upload.LIST_IGNORE
              }
          } catch (error) {
              console.log(error)
          }
      }
      setLoading(false)
  }

const fileUploadService = {
   gets3ConfigUrl,
   gets3PublicConfigUrl,
   uploadFileAWSUrl
}

export default fileUploadService
