export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)

        this.tbody = this.root.querySelector('table tbody')

        this.load()
    }

    load() {
        this.entries = [
            {
                login: 'brenofacanha',
                name: 'breno-facanha',
                public_repos: '76',
                followers: '2200',
           },
           {
                login: 'yagocayo',
                name: 'Yago cayo',
                public_repos: '76',
                followers: '1200',
            }
        ]
    }
}

export class FavoritesView extends Favorites {
    constructor(root){
        super(root)

        this.update()

       
    }

    update() { 
       this.removeAlltr()


       
        this.entries.forEach(user => {
            const row = this.createRow()
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Image de ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            

            this.tbody.append(row)
        })
       
    }

    createRow(){

        const tr = document.createElement('tr')

        const content = `
            <td class="user">
                <img src="https://github.com/breno-facanha.png" alt="" >
                <a href="">
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