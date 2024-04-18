const url = 'https://emkc.org/api/v2/piston'

const ExecuteCode = async (language, version, code) => {
    const response = await fetch(`${url}/execute`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            language: language,
            version: version,
            files: [
                {
                    name: 'main.py',
                    content: code
                }
            ]
        })
    })
    return await response.json()
}

const FetchLanguages = async () => {
    try {
        const response = await fetch(`${url}/runtimes`);
        const data = await response.json()
        console.log('data', data)
        return data
    } catch (error) {
        console.error('error', error)
        return error
    }
}

export { ExecuteCode, FetchLanguages }