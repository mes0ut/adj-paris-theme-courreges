class Search extends HTMLElement {
    constructor(){
        super();
        this.searchCl = {
            clearBtn: 'search-clear-button-js',
            searchInput: 'search-input-js'
        }
        this.init();
    }


    queryEls(){
        return {
            clearButton: document.querySelector('.' + this.searchCl.clearBtn),
            searchInput: document.querySelector('.' + this.searchCl.searchInput)
        }
    }
    
    handleClearBtn(input, button){
        setTimeout(() => {
            if (input.value !== '') {
                button.classList.add('search-clear-button-active-js');
            } else {
                button.classList.remove('search-clear-button-active-js');
            }
        }, 200);
    }


    init(){
        const searchEls = this.queryEls();

        if (searchEls.searchInput.value.length > 0) {
            searchEls.clearButton.classList.add('search-clear-button-active-js');
        }
    
        searchEls.searchInput.addEventListener('keydown', e => {
           this.handleClearBtn(searchEls.searchInput ,searchEls.clearButton);
        })
    
        searchEls.clearButton.addEventListener('click', e => {
            e.preventDefault();
            searchEls.searchInput.value = '';
            searchEls.clearButton.classList.remove('search-clear-button-active-js');
        })
    }
}

customElements.define("custom-search", Search);

// Old fallback below ˇˇˇˇ

// const searchCl = {
//     clearBtn: 'search-clear-button-js',
//     searchInput: 'search-input-js'
// }

// const queryEls = function(){
//     return {
//         clearButton: document.querySelector('.' + searchCl.clearBtn),
//         searchInput: document.querySelector('.' + searchCl.searchInput)
//     }
// }

// const handleClearBtn = function(input, button){
//     setTimeout(() => {
//         if (input.value !== '') {
//             button.classList.add('search-clear-button-active-js');
//         } else {
//             button.classList.remove('search-clear-button-active-js');
//         }
//     }, 200);
// }

// const initSearch = function(){
//     const searchEls = queryEls();

//     if (searchEls.searchInput.value.length > 0) {
//         searchEls.clearButton.classList.add('search-clear-button-active-js');
//     }

//     searchEls.searchInput.addEventListener('keydown', e => {
//        handleClearBtn(searchEls.searchInput ,searchEls.clearButton);
//     })

//     searchEls.clearButton.addEventListener('click', e => {
//         e.preventDefault();
//         searchEls.searchInput.value = '';
//         searchEls.clearButton.classList.remove('search-clear-button-active-js');
//     })
// }

// initSearch();
