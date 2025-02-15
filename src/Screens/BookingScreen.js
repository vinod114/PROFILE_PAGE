import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from '../media/images/placeholder.jpg';
import Loader from "../Components/Loader";
import Error from "../Components/Error";

function BookingScreen() {
  const { id } = useParams(); // ✅ Get Room ID from URL
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ** Form States **
  const [name, setName] = useState(""); // Customer name
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const id1 = '67adf5d1c4488e4dff8f5f1e';

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`/api/rooms/getroombyid/${id1}`);
        setRoom(response.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setError("Failed to load room details");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  // ** Calculate Total Days & Amount **
  useEffect(() => {
    if (checkInDate && checkOutDate && room) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const differenceInTime = end - start;
      const days = differenceInTime / (1000 * 3600 * 24); // Convert ms to days
      setTotalDays(days > 0 ? days : 0);
      setTotalAmount(days > 0 ? days * room.price : 0);
    }
  }, [checkInDate, checkOutDate, room]);

  if (loading) return <div className="text-center mt-5"><h3><Loader/></h3></div>;
  if (error) return <div className="text-danger text-center mt-5"><h3><Error/></h3></div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{room?.name}</h2>
      <div className="row">
  <div className="col-md-6 text-start">
    {/* Image Carousel */}
    <div id="roomCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {room.imageurl?.length > 0 ? (
          room.imageurl.map((img, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img src={defaultImage} alt={room.name} className="d-block w-100" style={{ height: "350px", objectFit: "cover" }} />
            </div>
          ))
        ) : (
          <div className="carousel-item active">
            <img src={defaultImage} alt="No Image" className="d-block w-100" />
          </div>
        )}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#roomCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#roomCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  </div>

  <div className="col-md-6 text-start">
    {/* Room Details */}
    <h4>Room Details</h4>
    <p><strong>Type:</strong> {room.type}</p>
    <p><strong>Max Guests:</strong> {room.maxcount}</p>
    <p><strong>Contact:</strong> {room.phonenumber}</p>
    <p><strong>Description:</strong> {room.description}</p>
    <p><strong>Price per night:</strong> ${room.price}</p>

    {/* Booking Summary */}
    <h4 className="mt-4">Booking Summary</h4>
    <p><strong>Name:</strong> {name || "N/A"}</p>
    <p><strong>From:</strong> {checkInDate || "N/A"}</p>
    <p><strong>To:</strong> {checkOutDate || "N/A"}</p>
    <p><strong>Total Days:</strong> {totalDays}</p>
    <p><strong>Rent per Day:</strong> ${room.price}</p>
    <p><strong>Total Amount:</strong> ${totalAmount}</p>

    {/* Book Now Button */}
    <button className="btn btn-success w-100" disabled={!name || totalDays <= 0}>
      Book Now
    </button>
  </div>
</div>

    </div>
  );
}

export default BookingScreen;
