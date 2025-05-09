import { Hex } from "viem";
import { keccak256, stringToBytes } from "viem/utils";

interface Riddle {
  question: string;
  answer: string;
}

export function generateRiddle(): Riddle {
  return riddles[Math.floor(Math.random() * riddles.length)];
}

export function hashAnswer(answer: string): Hex {
  return keccak256(stringToBytes(answer));
}

const riddles: Riddle[] = [
  { question: "What has hands but can’t clap?", answer: "clock" },
  { question: "What has many teeth but can’t bite?", answer: "comb" },
  {
    question: "What is so fragile that just saying its name breaks it?",
    answer: "silence",
  },
  { question: "What is harder to catch the faster you run?", answer: "breath" },
  { question: "What gets wetter as it dries?", answer: "towel" },
  {
    question:
      "I follow you all the time and copy your every move, but you can’t touch me or catch me. What am I?",
    answer: "shadow",
  },
  {
    question: "People buy me to eat but never eat me. What am I?",
    answer: "plate",
  },
  {
    question: "I’m tall when I’m young and I’m short when I’m old. What am I?",
    answer: "candle",
  },
  {
    question:
      "I have no feet, no hands, no wings, but I climb to the sky. What am I?",
    answer: "smoke",
  },
  {
    question:
      "The maker doesn’t want it. The buyer doesn’t use it. The user doesn’t know it. What am I?",
    answer: "coffin",
  },
  { question: "What has a neck but no head?", answer: "bottle" },
  { question: "What has an eye but cannot see?", answer: "needle" },
  { question: "What has a head and a tail but no body?", answer: "coin" },
  {
    question: "What is full of holes but still holds water?",
    answer: "sponge",
  },
  { question: "What goes up but never comes down?", answer: "age" },
  {
    question: "What belongs to you but others use it more than you do?",
    answer: "name",
  },
  {
    question: "What is always in front of you but can’t be seen?",
    answer: "future",
  },
  {
    question: "What can travel around the world while staying in a corner?",
    answer: "stamp",
  },
  { question: "What can you catch but not throw?", answer: "cold" },
  {
    question: "What kind of room has no doors or windows?",
    answer: "mushroom",
  },
  { question: "What gets bigger the more you take away?", answer: "hole" },
  {
    question: "What has many keys but can’t open a single lock?",
    answer: "piano",
  },
  { question: "What has legs but cannot walk?", answer: "table" },
  { question: "What comes down but never goes up?", answer: "rain" },
  {
    question: "What has a thumb and four fingers but is not a hand?",
    answer: "glove",
  },
  { question: "What kind of band never plays music?", answer: "rubber" },
  { question: "What is easy to lift but hard to throw?", answer: "feather" },
  {
    question:
      "What has cities but no houses, forests but no trees, and rivers but no water?",
    answer: "map",
  },
  { question: "What is always coming but never arrives?", answer: "tomorrow" },
  { question: "What has words but never speaks?", answer: "book" },
  { question: "What has one eye but cannot see?", answer: "needle" },
  { question: "What has a ring but no finger?", answer: "phone" },
  { question: "What can be cracked, made, told, and played?", answer: "joke" },
  { question: "What has a spine but no bones?", answer: "book" },
  { question: "What has ears but cannot hear?", answer: "corn" },
  { question: "What can fill a room but takes up no space?", answer: "light" },
  {
    question:
      "What has roots that nobody sees, is taller than trees, up, up it goes, and yet never grows?",
    answer: "mountain",
  },
  {
    question: "What has an endless supply of letters but starts empty?",
    answer: "mailbox",
  },
  {
    question: "What has a bed but never sleeps and runs but never walks?",
    answer: "river",
  },
  {
    question:
      "What comes once in a minute, twice in a moment, but never in a thousand years?",
    answer: "m",
  },
  { question: "What has a bark but no bite?", answer: "tree" },
  { question: "What flies without wings?", answer: "time" },
  {
    question: "What can you break, even if you never pick it up or touch it?",
    answer: "promise",
  },
  { question: "What has a bottom at the top?", answer: "leg" },
  {
    question: "What is always answered but never asks a question?",
    answer: "phone",
  },
  { question: "What comes after rain goes?", answer: "umbrella" },
  {
    question: "What is black when it’s clean and white when it’s dirty?",
    answer: "chalkboard",
  },
  {
    question: "What is made of water but if you put it into water it will die?",
    answer: "ice",
  },
  { question: "What kind of tree can you carry in your hand?", answer: "palm" },
  {
    question: "What begins with T, finishes with T, and has T in it?",
    answer: "teapot",
  },
];
