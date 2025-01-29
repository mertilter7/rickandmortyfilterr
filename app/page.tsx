'use client';
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Character {
  id: number;
  name: string;
  status: string;
  gender: string;
  image: string;
}
export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [status, setStatus] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  useEffect(() => {
    const getCharacters = async () => {
      let url = "https://rickandmortyapi.com/api/character/?";
      if (status) url += `status=${status}&`;
      if (gender) url += `gender=${gender}&`;
      
      try {
        const { data } = await axios.get(url);
        setCharacters(data.results || []);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    getCharacters();
  }, [status, gender]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold text-center">Rick and Morty Characters Task</h1>
      <div className="flex gap-4 justify-center my-5">
        {/* Status Select Filter Aşağıoda */}
        <select 
          className="p-2 bg-gray-800 border rounded" 
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          <option value="">All Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        {/* Gender Select Filter Aşağıda */}
        <select 
          className="p-2 bg-gray-800 border rounded" 
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
        {/* Basit Bir Kart Tasarımı ile karakterleri gösterdiğim döngü aşağıda */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((char) => (
          <div key={char.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <img src={char.image} alt={char.name} className="w-full h-52 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{char.name}</h2>
            <p className="text-gray-400">Status: {char.status}</p>
            <p className="text-gray-400">Gender: {char.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
