import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Form.css'

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bookingDate: null,
    bookingTime: '',
    bookingDuration: '1',
    termsAgreed: true, 
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    bookingDate: '',
    bookingTime: '',
    bookingDuration: '',
    termsAgreed: '',
  });

  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      bookingDate: date,
    });
  };

  const handleDurationChange = (e) => {
    setFormData({
      ...formData,
      bookingDuration: e.target.value,
    });
  };

  const handleTermsChange = (e) => {
    setFormData({
      ...formData,
      termsAgreed: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateInputs();
  };

  const validateInputs = () => {
    const { name, phone, bookingDate, bookingTime, bookingDuration, termsAgreed } = formData;
    const newErrors = {};

    if (name.trim() === '') {
      newErrors.name = 'Имя является обязательным полем';
    } else if (!/^[А-Яа-я]+$/.test(name)) {
      newErrors.name = 'Имя должно содержать только кириллицу';
    }

    if (!phone) {
      newErrors.phone = 'Телефон является обязательным полем';
    } else if (!/^\d{11}$/.test(phone)) {
      newErrors.phone = 'Телефон должен содержать 11 цифр';
    }

    if (!bookingDate) {
      newErrors.bookingDate = 'Дата бронирования является обязательным полем';
    } else if (bookingDate < new Date()) {
      newErrors.bookingDate = 'Дата бронирования должна быть не ранее следующего дня';
    }

    if (!/^(?:[0-1][0-9]|[2][0-3]):[0-5][0-9]$/.test(bookingTime)) {
      newErrors.bookingTime = 'Время бронирования должно быть в формате ЧЧ:ММ';
    }

    if (!bookingDuration) {
      newErrors.bookingDuration = 'Длительность бронирования является обязательным полем';
    }

    if (!termsAgreed) {
      newErrors.termsAgreed = 'Пожалуйста, подтвердите согласие с условиями';
    }

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage(`Бронирование успешно создано! 
        Имя: ${name}
        Телефон: ${phone}
        Дата бронирования: ${bookingDate.toLocaleDateString()}
        Время бронирования: ${bookingTime}
        Длительность бронирования: ${bookingDuration} часов`);
      setFormData({
        name: '',
        phone: '',
        bookingDate: null,
        bookingTime: '',
        bookingDuration: '1',
        termsAgreed: true, 
      });
      setFormErrors({});
    }
  };

  return (
    <div>
      {successMessage && <div className="success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
      <div className={`input-group ${formErrors.time ? 'error' : ''}`}>
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <div className="error">{formErrors.time}</div>
        </div>
        <div className={`input-group ${formErrors.time ? 'error' : ''}`}>
          <label htmlFor="phone">Телефон:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          
        </div>
        <div className={`input-group ${formErrors.time ? 'error' : ''}`}>
          <label htmlFor="bookingDate">Дата бронирования:</label>
          <DatePicker
            id="bookingDate"
            selected={formData.bookingDate}
            onChange={handleDateChange}
            dateFormat="dd.MM.yyyy"
            minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
          />
         
        </div>
        <div className={`input-group ${formErrors.time ? 'error' : ''}`}>
          <label htmlFor="bookingTime">Время бронирования:</label>
          <input
            type="text"
            id="bookingTime"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
          />
         
        </div>
        <div className={`input-group ${formErrors.time ? 'error' : ''}`}>
          <label htmlFor="bookingDuration">Длительность бронирования:</label>
          <select id="bookingDuration" name="bookingDuration" value={formData.bookingDuration} onChange={handleDurationChange}>
            <option value="1">1 час</option>
            <option value="3">3 часа</option>
            <option value="5">5 часов</option>
          </select>
          
        </div>
        <div>
          <input
            type="checkbox"
            id="termsAgreed"
            name="termsAgreed"
            checked={formData.termsAgreed}
            onChange={handleTermsChange}
          />
          <label htmlFor="termsAgreed">Я согласен с условиями</label>
          {formErrors.termsAgreed && <span className="error">{formErrors.termsAgreed}</span>}
        </div>
        <button type="submit">Забронировать</button>
      </form>
    </div>
  );
};

export default BookingForm;


 