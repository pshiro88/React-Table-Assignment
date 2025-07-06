import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addContact } from '../features/contacts/contactsSlice';

const ContactForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addContact({ ...data, createdAt: new Date().toISOString() }));
    reset(); // Clear the form
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 shadow-md rounded mb-8"
    >
      {/* Email */}
      <div>
        <label>Email *</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="border p-2 w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      {/* Secondary Email */}
      <div>
        <label>Secondary Email</label>
        <input
          type="email"
          {...register('secondaryEmail')}
          className="border p-2 w-full"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label>Phone No 1</label>
        <input
          type="text"
          {...register('phone1')}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Phone No 2</label>
        <input
          type="text"
          {...register('phone2')}
          className="border p-2 w-full"
        />
      </div>

      {/* Mobile Number */}
      <div>
        <label>Mobile No 1</label>
        <input
          type="text"
          {...register('mobile1')}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Mobile No 2</label>
        <input
          type="text"
          {...register('mobile2')}
          className="border p-2 w-full"
        />
      </div>

      {/* Social Links */}
      <div>
        <label>LinkedIn</label>
        <input
          type="url"
          {...register('linkedin')}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Skype ID</label>
        <input
          type="text"
          {...register('skype')}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Twitter</label>
        <input
          type="text"
          {...register('twitter')}
          className="border p-2 w-full"
        />
      </div>

      {/* Address Section */}
      <div>
        <label>Pin Code</label>
        <input
          type="text"
          {...register('pincode')}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Country</label>
        <input
          type="text"
          {...register('country')}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>State</label>
        <input
          type="text"
          {...register('state')}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>City</label>
        <input
          type="text"
          {...register('city')}
          className="border p-2 w-full"
        />
      </div>

      <div className="md:col-span-2">
        <label>Address Line</label>
        <input
          type="text"
          {...register('addressLine')}
          className="border p-2 w-full"
        />
      </div>

      {/* Remarks */}
      <div className="md:col-span-2">
        <label>Remarks</label>
        <textarea
          {...register('remarks')}
          className="border p-2 w-full"
        ></textarea>
      </div>

      {/* Appointment Info */}
      <div>
        <label>Appointment Status</label>
        <select {...register('appointmentStatus')} className="border p-2 w-full">
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div>
        <label>Appointment Date</label>
        <input
          type="date"
          {...register('appointmentDate')}
          className="border p-2 w-full"
        />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
