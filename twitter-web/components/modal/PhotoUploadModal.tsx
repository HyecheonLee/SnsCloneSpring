import React, { useState } from "react";
import { useSelector } from '../../store'
import Portal from '../Portal'
import { Button, Modal } from 'react-bootstrap'
import { Cropper } from 'react-cropper'
import "cropperjs/dist/cropper.css";
import { apiV1File, domain } from '../../utils/apiUtils'
import { useRouter } from 'next/router'

interface IProps {
}

const PhotoUploadModal: React.FC<IProps> = ({...props}) => {

  const modal = useSelector(state => state.modal)
  const [image, setImage] = useState("");
  const [cropper, setCropper] = useState<any>();

  const handleClose = () => {
    modal.onClose && modal.onClose()
  };
  const handleClick = async () => {
    // modal.onClick && modal.onClick()
    if (cropper && cropper.getCroppedCanvas()) {
      const canvas = cropper.getCroppedCanvas()
      const url = canvas.toDataURL()
      modal.onClick && modal.onClick(url)
    } else {
      alert("업로드한 이미지가 없습니다.")
    }
  }

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };


  if (modal.type === "photoUpload" && modal.isShow) {
    return (<Portal selector={"#modal"}>
      <Modal
        show={modal.isShow}
        backdrop="static"
        keyboard={true}
        centered
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modal?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="input-group mb-2">
              <input type="file" id={"fileInput"} className={"form-control"}
                     onChange={onChange}/>
            </div>
            <Cropper
              style={{maxHeight: 400, width: "100%"}}
              zoomTo={0.5}
              initialAspectRatio={1}
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={true}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"secondary"} color={"white"} className={"text-white"}
                  onClick={handleClose}>취소</Button>
          <Button variant={"primary"} color={"white"} className={"text-white"}
                  onClick={handleClick}>확인</Button>
        </Modal.Footer>
      </Modal>
    </Portal>);
  }
  return null;
};

export default PhotoUploadModal;
