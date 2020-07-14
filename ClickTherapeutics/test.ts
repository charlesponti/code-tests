interface Vote {
  name: string
  timestamp: number
}

interface VoteCount {
  [candidateName: string]: number
}

type Votes = Vote[]

const votes: Votes = [
  { name: 'John Doe', timestamp: 10 },
  { name: 'John Doe', timestamp: 11 },
  { name: 'Rick Doe', timestamp: 12 },
  { name: 'Rick Doe', timestamp: 12 },
  { name: 'Jane Doe', timestamp: 11 },
  { name: 'Jane Doe', timestamp: 14 },
  { name: 'John Doe', timestamp: 10 },
  { name: 'Jane Doe', timestamp: 14 },
  { name: 'Jane Doe', timestamp: 10 },
  { name: 'Rick Doe', timestamp: 15 },
  { name: 'Jane Doe', timestamp: 10 },
  { name: 'Rick Doe', timestamp: 15 },
  { name: 'Jane Doe', timestamp: 10 },
  { name: 'Rick Doe', timestamp: 15 },
]

/**
 * 
 * @param votes Votes
 * @param timestamp 
 */
function findWinningCandidate(votes: Votes, timestamp: number, numOfCandidates?: number) {
  // { 'CANDIDATE_NAME' : VOTE_COUNT, ... }
  let winningCount: number = 0
  let winner: string = ''
  const voteCount: VoteCount = {}
  
  for (let i = 0; i < votes.length; i++) {
    const vote = votes[i]
    
    if (vote.timestamp < timestamp) {
      voteCount[vote.name] = (voteCount[vote.name] || 0) + 1
    }

    if (voteCount[vote.name] > winningCount) {
      winningCount = voteCount[vote.name]
      winner = vote.name
    }
  }

  if (numOfCandidates) {
    return (
      Object
        // Get names of candidates
        .keys(voteCount)
        // Sort candidates by number of votes
        .sort((candidateA, candidateB) => voteCount[candidateB] - voteCount[candidateA])
        // Return only candidates up to max
        .splice(0, numOfCandidates)
    )
  }

  return { winner, winningCount }
}

console.log(findWinningCandidate(votes, 15, 3))