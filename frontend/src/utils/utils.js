const cohortNum = 'cohort-76'
const apiUrl = `https://mesto.nomoreparties.co/v1/${cohortNum}`
const token = 'f22eb229-93ed-4f07-bd67-7afa7388cca6' // isn`t good idea

export const apiOptions = {
  url: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    authorization: token
  }
}

const apiAuthUrl = 'https://auth.nomoreparties.co'
export const apiAuthOptions ={
  url: apiAuthUrl,
  headers: {
    'Content-Type': 'application/json',
  }
}