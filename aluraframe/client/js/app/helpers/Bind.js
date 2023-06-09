class Bind {

    constructor(model, view, ...props) {
        
        let proxy = ProxyFactory.create(model, props, () => 
            view.update(model)
        );

        view.update(model);

        return proxy

    }

}