import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getGroup } from '../../services/groupsSevice';

export default function GroupDetail() {
  const { id } = useParams(); 

  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      const data = await getGroup(id)
      setGroup(data);
    };

    fetchGroupDetails();
  }, [id]);  

  if (!group) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{group.group_name}</h1>
      <p>{group.group_description}</p>
      {/* Aquí puedes mostrar más detalles del grupo */}
    </div>
  );
}
