export const authStorage = {
    saveBasicCredentials: (login: string, password: string) => {
        localStorage.setItem('basic-creds', JSON.stringify({login, password}))
    },
    getBasicCredentials: () => {
        const credentials = localStorage.getItem('basic-creds')
        if (credentials) {
            const creds = JSON.parse(credentials)
            return creds
        }
        return null
      },
    removeBasicCredentials: () => localStorage.removeItem('basic-creds')
 }