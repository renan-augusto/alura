class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

    }


    adiciona(event){
        event.preventDefault();

        let negociacao = new Negociacao (
            this._inputData.value,
            this._inputValor.value,
            this._inputQuantidade.value
        );
        
        console.log(negociacao)

    }

}