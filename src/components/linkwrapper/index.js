import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const LinkWrapper = (link) =>  {    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(link)
    setShow(true)
    console.log(show)
   // console.log(url)
    // if (url.hostname === "URL" ) return <a target="_blank" rel="noreferrer" href={link}>{link}</a>
    // else
    return (
        <Modal
    open={handleShow}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
      <iframe
        src={link}
        width="500"
        height="300"
        title="Login"
      ></iframe>
    </Box>
  </Modal>
    );
  }

export default LinkWrapper