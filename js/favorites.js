import { GithubUser } from "./GithubUser.js"

export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)

        this.tbody = this.root.querySelector('table tbody')

        this.load()

        GithubUser.search('breno-facanha').then(user => console.log(user))
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }

    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(username){
        try{

            const userExists = this.entries.find(entry => entry.login === username )

            console.log(userExists)

            if(userExists) {
                throw new Error ('Usuário ja cadastrado')
            }

            const user = await GithubUser.search(username)
            if(user.login === undefined){
                throw new Error('Usuário não encontrado')
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        } catch(error){
            alert(error.message)
        }

    }

    delete(user){
        const filteredntrie = this.entries
            .filter( entry => entry.login !== user.login)


        this.entries = filteredntrie
        this.update()
        this.save()
    }
}

export class FavoritesView extends Favorites {
    constructor(root){
        super(root)

        this.update()

       this.onadd()
    }

    onadd(){
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const value = this.root.querySelector('#input-search').value
            this.add(value)
        }
    }

    update() { 
       this.removeAlltr()


       
        this.entries.forEach(user => {
            const row = this.createRow()
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Image de ${user.name}`
            row.querySelector('.user a').href = `https://github.com/${user.login}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers
            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Tem certeza que deseja deletar essa linha')
                if(isOk){
                    this.delete(user)
                }
            }        

            this.tbody.append(row)
        })
       
    }

    createRow(){

        const tr = document.createElement('tr')

        const content = `
            <td class="user">
                <img src="https://github.com/breno-facanha.png" alt="" >
                <a href="" target="_blank">
                    <p>Breno Façanha</p>
                    <span>breno-facanha</span>
                </a>
            </td>
            <td class="repositories"> 42  </td>
            <td class="followers"> 5 </td>
            <td>
                <button class="remove">&times;</button>
            </td>

       `

       tr.innerHTML = content

       return tr
    }

    removeAlltr(){
        this.tbody.querySelectorAll('tr').forEach( tr => tr.remove() );
    }
}