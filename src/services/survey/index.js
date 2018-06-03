import { getUser, fetchApi } from '../../constants/functions'
import { GET_CANDIDATES, GET_VOTES_RESULT, SET_VOTE } from '../../constants/routes'
import { mapPage, mapVote } from '../../config/utils'

export const getCandidates = async (candidateType, voteNumber) => {
  const user = await getUser()
  let params = ''
  if (candidateType) {
    params = `&candidateType=${candidateType}`
  }
  if (voteNumber) {
    params += `&voteNumber=${voteNumber}`
  }
  const options = {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  return fetchApi(`${GET_CANDIDATES}?${params}`, options)
    .then((response) => {
      const { candidates, voteUser } = response.payload
      const candidatesList = candidates.map(page => mapPage(page))
      return { candidatesList, voteUser }
    })
    .catch((error) => {
      throw error
    })
}

export const getVotesResult = async (candidateType) => {
  const user = await getUser()
  let params = ''
  if (candidateType) {
    params = `&type=${candidateType}`
  }
  const options = {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }
  try {
    const fetchResponse = await fetchApi(`${GET_VOTES_RESULT}?${params}`, options)
    const {
      candidates,
      total,
      totalIndeciso,
      totalNulo,
      votesUser
    } = fetchResponse.payload
    const votes = candidates.map(vote => mapVote(vote))
    const votesUserMapped = votesUser.map(vote => mapVote(vote))
    const undecidedMapped = mapVote(totalIndeciso)
    const nullMapped = mapVote(totalNulo)
    return {
      votes,
      total,
      totalIndeciso: undecidedMapped,
      totalNulo: nullMapped,
      votesUser: votesUserMapped
    }
  } catch (err) {
    throw err
  }
}

export const setVoteCandidate = async (candidateType, voteType, pageId, voteNumber) => {
  const user = await getUser()
  const bodySend = { candidateType, voteType }
  if (voteNumber) {
    bodySend.voteNumber = voteNumber
  }
  if (pageId) {
    bodySend.pageId = pageId
  }
  const options = {
    method: 'POST',
    headers: {
      Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodySend)
  }
  return fetchApi(SET_VOTE, options)
    .then((response) => {
      return response
    }).catch((err) => { throw err })
}
