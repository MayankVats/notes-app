import { addNote, removeNote, listNotes, readNotes } from "./notes.js";

import _yargs from "yargs";
import { hideBin } from "yargs/helpers";

const yargs = _yargs(hideBin(process.argv));

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Body of the note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Title of the note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    removeNote(argv.title);
  },
});

// Create a list command
yargs.command({
  command: "list",
  describe: "List all notes!",
  handler: () => {
    listNotes();
  },
});

// Create a read command
yargs.command({
  command: "read",
  describe: "Read notes!",
  builder: {
    title: {
      describe: "Title of the note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    readNotes(argv.title);
  },
});

yargs.parse();
