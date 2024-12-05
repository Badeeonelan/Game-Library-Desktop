import { DivComponent } from "../../common/div-component";
import './search.css';


export class Search extends DivComponent {
    constructor(state) {
        super();
        this.state = state;
    }

    search() {
        const query = document.querySelector('.search__input').value;
        this.state.searchQuery = query;
        document.querySelector('.search__input').value = '';
    }

    render() {
        this.el.innerHTML = '';
        this.el.classList.add('search');
        this.el.innerHTML = `
            <div class="search__field">
                <img src="/static/search-inp.png" alt="Search logo"/>
                <input type="text" class="search__input" placeholder="Найти книгу или автора..."/>
            </div>
            <button class="search__button">
                <img src="/static/search-wh.svg" alt="Search logo"/>
            </button>
        `;
        this.el.querySelector('button').addEventListener('click', this.search.bind(this));
        this.el.querySelector('input').addEventListener('keydown', (e) => {
            if (e.code === 'Enter') {
                this.search();
            }
        })
        return this.el;
    }
}