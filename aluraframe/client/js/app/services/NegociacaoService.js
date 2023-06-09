class NegociacaoService {
    obterNegociacoesDaSemana(cb) {
        let xhr = new XMLHttpRequest();
        
        xhr.open('GET', 'negociacoes/semana');
    
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new date(objeto.data), objeto.quantidade, objeto.valor)))

            } else {
                console.log(xhr.responseText);
                this._mensagem.texto = 'Não foi possível obter as negociações'
            }
        }
    };
    
    xhr.send();
    
    }

    obterNegociacoesDaSemanaAnterior(cb) {
        let xhr = new XMLHttpRequest();
        
        xhr.open('GET', 'negociacoes/anterior');
    
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new date(objeto.data), objeto.quantidade, objeto.valor)))

            } else {
                console.log(xhr.responseText);
                this._mensagem.texto = 'Não foi possível obter as negociações'
            }
        }
    };
    
    xhr.send();
    
    }

    obterNegociacoesDaSemanaRetrasada(cb) {
        let xhr = new XMLHttpRequest();
        
        xhr.open('GET', 'negociacoes/retrasada');
    
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new date(objeto.data), objeto.quantidade, objeto.valor)))

            } else {
                console.log(xhr.responseText);
                this._mensagem.texto = 'Não foi possível obter as negociações'
            }
        }
    };
    
    xhr.send();
    
    }
    
}

