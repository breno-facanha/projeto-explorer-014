// classe que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites{
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load(){
        const entries = [{
            login: 'maykbrito',
            name: "Mayk Brito",
            public_repos: '76',
            followers: '12000'
        },
        {
            login: 'diego3g',
            name: "Diego Fernandes",
            public_repos: '76',
            followers: '12000'
        }
    ]

     this.entries = entries
    }
}

// classe que vai criar a vizualização e eventos do HTML

export class FavoritesViews extends Favorites{
    constructor(root){
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
    }

    update() {
       this.removeAllTr()
        
  

    this.entries.forEach( user => {
        const row = this.creatRow()
        
        row.querySelector('.user img').src = `https://github.com/${user.login}.png`
        row.querySelector('.user img').alt = `Image de ${user.name}`
        row.querySelector('.user p').textContent = user.name
        row.querySelector('.user span').textContent = user.login
        row.querySelector('.repositories').textContent = user.public_repos
        row.querySelector('.followers').textContent = user.followers

        this.tbody.append(row)
    })


    }

    creatRow(){
        const tr = document.createElement('tr')

        const content = `
        
            <td class="user">
                <img src="https://github.com/breno-facanha.png" alt="">
                <a href="https://github.com/breno-facanha">
                    <p>Breno Façanha</p>
                    <span>breno-facanha</span>
                </a>
            </td>
            <td class="repositories">41</td>
            <td class="followers">10</td>
            <td><button class="remove">&times;</button> </td>
        `

        tr.innerHTML = content

        return tr     
    }

    removeAllTr(){
        

        this.tbody.querySelectorAll('tr').forEach(element => {
            element.remove()
        });
    }
}