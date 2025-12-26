export default defineNuxtRouteMiddleware((to, from) => {
  const cookies = useCookie('pathumToken')
  const allCookies = useRequestHeaders(['cookie'])
  
  console.log('Available cookies:', allCookies.cookie)
  console.log('pathumToken:', cookies.value)
})
