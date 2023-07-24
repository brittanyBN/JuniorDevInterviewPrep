import React, {useEffect, useState} from 'react';
import {NavigationBar} from '../Components/NavigationBar';
import {CardSetCard} from '../Components/CardSetCard';
import './PracticeSet.css';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';

export const FlashcardSetPage = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [token] = useState(localStorage.getItem('token'));
  const [id] = useState(localStorage.getItem('id'));
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { selectedLanguage } = useParams();

  const itemsPerPage = 8;

  useEffect(() => {
     fetchFlashcardSets().then(() => {
      console.log('Flashcard sets fetched');
    });
  }, [token, currentPage, selectedLanguage]);

  async function fetchFlashcardSets() {
    if (!token) {
      alert('You must be logged in to add a new flashcard set');
      window.location.href = '/login';
    }

    try {
      if (selectedLanguage !== undefined) {
        console.log("selected LANGUAGE", selectedLanguage);
        const response = await axios.get(`/flashcardSets/language/${selectedLanguage}?page=${currentPage}&size=${itemsPerPage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-User-Role': 'admin',
            'Content-type': 'application/json',
          },
        });
        setFlashcardSets(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        return response;
      } else {
        const response = await axios.get(`/flashcardSets/set?page=${currentPage}&size=${itemsPerPage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-User-Role': 'admin',
            'Content-Type': 'application/json',
          },
        });
        setFlashcardSets(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        return response;
      }
    } catch (error) {
      console.error('Error fetching flashcard sets:', error);
    }
  }


  async function addNewFlashcardSet() {
    if (!token) {
      alert('You must be logged in to add a new flashcard set');
      return;
    }

    let data = prompt('Enter the name of the new flashcard set');
    if (!data) {
      return; // User canceled, do nothing
    }

    let selectedLanguageId;
    if (selectedLanguage === "e46faef5-16cb-4a9f-a3a4-10b3ea325ca6") {
      selectedLanguageId = "e46faef5-16cb-4a9f-a3a4-10b3ea325ca6";
    } else if (selectedLanguage === "5e5d8c79-ffdf-4365-85fb-c35d613a0272") {
      selectedLanguageId = "5e5d8c79-ffdf-4365-85fb-c35d613a0272";
    } else if (selectedLanguage === "404c0329-7085-42dd-a41f-563ba877e981") {
      selectedLanguageId = "404c0329-7085-42dd-a41f-563ba877e981";
    } else {
      const userInput = prompt("Please select the desired programming language: Java, JavaScript, or C#");
      if (userInput) {
        const normalizedInput = userInput.toLowerCase();
        if (normalizedInput === "javascript") {
          selectedLanguageId = "e46faef5-16cb-4a9f-a3a4-10b3ea325ca6";
        } else if (normalizedInput === "java") {
          selectedLanguageId = "5e5d8c79-ffdf-4365-85fb-c35d613a0272";
        } else if (normalizedInput === "c#") {
          selectedLanguageId = "404c0329-7085-42dd-a41f-563ba877e981";
        } else {
          alert("Unsupported language. Please select from Java, JavaScript, or C#.");
          return;
        }
      } else {
        return;
      }
    }

    try {
      const response = await axios.post(
          '/flashcardSets',
          {
            name: data,
            UserId: id,
            ProgramLanguageId: selectedLanguageId
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
      );
      const newResponse = await fetchFlashcardSets();
      setFlashcardSets(newResponse.data.data);
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'Flashcard Set already exists') {
        alert('The flashcard set already exists');
      } else {
        console.error('Error posting new flashcard set:', error);
      }
    }
  }



  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
      <div className="Main-flashcardSet-wrapper">
        <NavigationBar />
        <div className="header">
          <h1>Flashcard Set</h1>
          <div id="add">
            <button onClick={addNewFlashcardSet} id="newFlashcard" aria-label="Add New Flashcard Set">
              Add New Flashcard Set
            </button>
          </div>
        </div>
        <div className="cardSet">
          {flashcardSets.map((flashcardSet) => (
              <Link
                  className="link"
                  key={flashcardSet.id}
                  to={`/flashcardSet/${flashcardSet.id}`}
              >
                <CardSetCard name={flashcardSet.name} />
              </Link>
          ))}
        </div>
        <div className="button-group">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button aria-label={`Page ${currentPage} of ${totalPages}`} disabled>
            {`${currentPage}/${totalPages}`}
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
  );
};
