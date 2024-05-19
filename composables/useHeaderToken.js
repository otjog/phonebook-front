export function useHeaderToken() {
    return {
        headers: {
            'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value
        }
    }
}