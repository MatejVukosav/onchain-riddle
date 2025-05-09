//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OnchainRiddle
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const onchainRiddleAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'correct', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'guess', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'AnswerAttempt',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'riddle',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'RiddleSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'guess', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'Winner',
  },
  {
    type: 'function',
    inputs: [],
    name: 'bot',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllGuesses',
    outputs: [{ name: '', internalType: 'string[]', type: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'guesses',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isActive',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'riddle',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_riddle', internalType: 'string', type: 'string' },
      { name: '_answerHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setRiddle',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_answer', internalType: 'string', type: 'string' }],
    name: 'submitAnswer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'winner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const
