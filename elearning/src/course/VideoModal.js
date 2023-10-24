import React from "react";
import Modal from "react-modal";
import "./VideoModal.css";

const VideoModal = ({ isOpen, closeModal, course }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName="overlay"
      className="videoModal"
    >
      <iframe
        width="1200"
        height="600"
        style={{ borderRadius: "20px", border: "none" }}
        src={`https://www.youtube.com/embed/${course.videoId}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </Modal>
  );
};

export default VideoModal;
