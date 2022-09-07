import fs from "fs";
import chalk from "chalk";

/**
 * @description function to list all of the notes
 */
export const listNotes = () => {
  const notes = loadNotes();

  console.log("Here's a list of notes:");

  notes.forEach((note) => console.log(chalk.bold.hex("#9b59b6")(note.title)));
};

export const readNotes = (title) => {
  const notes = loadNotes();

  const note = notes.find((note) => note.title === title);

  if (!note) {
    console.log(chalk.red("No note found!"));
  } else {
    console.log(chalk.italic.cyan(note.title));
    console.log(note.body);
  }
};

/**
 * @description function to add notes
 * @param {string} title title of the note
 * @param {string} body body of the note
 */
export const addNote = (title, body) => {
  const notes = loadNotes();

  // const duplicateNotes = notes.filter((note) => note.title === title);

  // find the first occurence of duplicate and stop the loop
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({ title, body });
    saveNote(notes);

    console.log(chalk.green("New note added!"));
  } else {
    console.log(chalk.red("Note title taken!"));
  }
};

/**
 * @description function to remove the note
 * @param {string} title the title of the note
 */
export const removeNote = (title) => {
  const notes = loadNotes();

  const newNotes = notes.filter((note) => note.title !== title);

  if (newNotes.length < notes.length) {
    saveNote(newNotes);
    console.log(chalk.green("Note Removed!"));
  } else {
    console.log(chalk.red("No Note Removed!"));
  }
};

/**
 * @description helper function to save notes
 * @param {string[]} notes array of notes object
 */
const saveNote = (notes) => {
  const notesJSON = JSON.stringify(notes);

  fs.writeFileSync("notes.json", notesJSON);
};

/**
 * @description helper function to load the notes from file
 * @returns an array of notes object
 */
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
