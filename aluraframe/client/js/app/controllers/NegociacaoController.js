class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");
    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      this._negociacoesView,
      'adiciona', 'esvazia')
    ProxyFactory.create(new ListaNegociacoes() ['adiciona', 'esvazia'], () => 
      this._negociacoesView.update(model)
   )

    this._negociacoesView = new NegociacoesView($("#negociacoesView"));
    this._negociacoesView.update(this._listaNegociacoes);
    this._mensagem = new Bind(
      new Mensagem(),
      this._mensagemView,
      ['texto']
    );
     ProxyFactory.create(new MensagemView(), ['texto'], (model) => this._mensagemView.update(model))
    this._mensagemView = new MensagemView($("#mensagemView"));
    this._mensagemView.update(this._mensagem);
  }

  adiciona(event) {
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = "Negociação adicionada com sucesso";
   
    this._limpaFormulario();
  }

  importaNegociacoes() {
    
    let service = new NegociacaoService();

    service.obterNegociacoesDaSemana( (err, negociacoes) => {

      if(err) {
        this._mensagem.texto = err;
        return;
      }

      negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociacoes importadas com sucesso';
    });

  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = "Negociações apagadas com sucesso";
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  _limpaFormulario() {
    this._inputData.value = "";
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }
}

