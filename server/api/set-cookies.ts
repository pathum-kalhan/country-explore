export default defineEventHandler((event) => {
  setCookie(event, 'pathumToken', 'this is the cookie')
  
  return {
    success: true,
    message: 'Cookie set successfully'
  }
})
