import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import placeholderImg from "../media/images/placeholder.jpg"; // Local placeholder image

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate(); // ✅ Hook for navigation

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/api/rooms/getallrooms");
        setRooms(response?.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleViewRoom = (room) => {
    setSelectedRoom(room);
    const modal = window.bootstrap.Modal.getOrCreateInstance(document.getElementById("roomModal"));
    modal.show();
  };

  const handleBookNow = (roomId) => {
    navigate(`/book/${roomId}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Available Rooms</h1>
      <div className="row g-4">
        {rooms?.map((room) => (
          <div key={room._id} className="col-sm-12 col-md-6 col-lg-4">
            <div className="card shadow">
              {/* Bootstrap Carousel in Cards */}
              <div id={`carousel-${room._id}`} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {room.imageurl?.length > 0 ? (
                    room.imageurl.map((img, index) => (
                      <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <img src={img} alt={room.name} className="d-block w-100" style={{ height: "250px", objectFit: "cover" }} />
                      </div>
                    ))
                  ) : (
                    <div className="carousel-item active">
                      <img src={placeholderImg} alt="No Image" className="d-block w-100" />
                    </div>
                  )}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${room._id}`} data-bs-slide="prev">
                  <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${room._id}`} data-bs-slide="next">
                  <span className="carousel-control-next-icon"></span>
                </button>
              </div>

              <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text text-truncate" title={room.description}>{room.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Max Count: {room.maxcount}</span>
                  <div>
                    <button className="btn btn-primary me-2" onClick={() => handleViewRoom(room)}>View Room</button>
                    <button className="btn btn-success" onClick={() => handleBookNow(room._id)}>Book Now</button> {/* ✅ Book Now */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="roomModal" tabIndex="-1" aria-labelledby="roomModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="roomModalLabel">{selectedRoom?.name}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedRoom && (
                <>
                  {/* Image Carousel in Modal */}
                  <div id="roomModalCarousel" className="carousel slide mb-3" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      {selectedRoom.imageurl?.length > 0 ? (
                        selectedRoom.imageurl.map((img, index) => (
                          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <img src={img} alt={selectedRoom.name} className="d-block w-100" style={{ height: "300px", objectFit: "cover" }} />
                          </div>
                        ))
                      ) : (
                        <div className="carousel-item active">
                          <img src="https://via.placeholder.com/600x300?text=No+Image" alt="No Image" className="d-block w-100" />
                        </div>
                      )}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#roomModalCarousel" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#roomModalCarousel" data-bs-slide="next">
                      <span className="carousel-control-next-icon"></span>
                    </button>
                  </div>

                  {/* Room Details */}
                  <p><strong>Type:</strong> {selectedRoom.type}</p>
                  <p><strong>Description:</strong> {selectedRoom.description}</p>
                  <p><strong>Max Guests:</strong> {selectedRoom.maxcount}</p>
                  <p><strong>Contact:</strong> {selectedRoom.phonenumber}</p>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              {selectedRoom && <button className="btn btn-success" onClick={() => handleBookNow(selectedRoom._id)}>Book Now</button>} {/* ✅ Book Now in Modal */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
