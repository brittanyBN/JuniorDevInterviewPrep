export const practiceFlashcards = (flashcards, id) => {
  if (flashcards.length === 0) {
    alert("You must add flashcards to this set before you can practice them");
  } else {
    const flashcardsData = encodeURIComponent(JSON.stringify(flashcards));
    window.location.href = `/flashcard/${id}?flashcards=${flashcardsData}`;
    console.log(flashcardsData);
  }
};
