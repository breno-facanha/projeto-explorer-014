export class GithubUser {
    static search(username){
        const ednpoint = `https://api.github.com/users/${username}`

        return fetch(ednpoint)
                .then(data => data.json())
                .then(data => ({
                    login: data.login,
                    name: data.name,
                    public_repos: data.public_repos,
                    followers: data.followers
                }))
    }
}