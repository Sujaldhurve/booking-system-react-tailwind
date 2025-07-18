import React, { useEffect, useState } from 'react';

const ServicesTab = () => {
  const [services, setServices] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await fetch('http://localhost:5000/api/services');
    const data = await res.json();
    setServices(data);
  };

  const addService = async () => {
    if (!name.trim()) return;
    const res = await fetch('http://localhost:5000/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const newService = await res.json();
    setServices([...services, newService]);
    setName('');
  };

  const deleteService = async (id) => {
    await fetch(`http://localhost:5000/api/services/${id}`, {
      method: 'DELETE',
    });
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Manage Services</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New service name"
          className="border p-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addService} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </div>
      <ul>
        {services.map(service => (
          <li key={service.id} className="flex justify-between border-b py-2">
            {service.name}
            <button onClick={() => deleteService(service.id)} className="text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesTab;
