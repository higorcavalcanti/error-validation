## Sobre

Essa biblioteca oferece uma maneira bastante simples de mostrar os erros de validação de um formulário.
Sem precisar ficar repetindo códigos, e de uma maneira bastante customizável.

![Demo](https://github.com/higorcavalcanti/error-validation/blob/master/docs/images/validation.gif?raw=true "Demo")


## Instalação

- Instale a biblioteca: `npm i @higorcavalcanti/error-validation`
- Atualize o `AppModule` e adicione o `ErrorValidationModule` na seção de `imports`:

```ts
@NgModule({
  declarations: [ AppComponent ],
  imports: [
    // ...
    ErrorValidationModule.forRoot({
      messages: {
        required: 'Required field!',
        email: 'Invalid Email!',
        min: ({actual, min}) => `Value ${actual} must be higher than ${min}`
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## Configurações

### validateAllInputs
Por padrão, será validado todos os formulários do sistema.
É possível desativar a validação automática alterando a propriedade `validateAllInputs: false` 
ao importar o `ErrorValidationModule` no `AppModule`:

```ts
// ...
ErrorValidationModule.forRoot({
  validateAllInputs: false,
  messages: { ... }
})
```

Dessa forma, será necessário utilizar em todos os formulários que se desejar validar a diretiva `errorValidation`:
```html
<form [formGroup]="form" errorValidation> <!-- Observe a diretiva -->
  <div>
    <label for="input1">Input1: </label>
    <input type="text" formControlName="input1" id="input1"/>
  </div>

  <div>
    <label for="input2">Input2: </label>
    <input type="text" formControlName="input2" id="input2"/>
  </div>
</form>
```

### maxErrors

Também é possível limitar a quantidade de erros que são exibidos por vêz.
Por padrão, serão exibidos todos os erros.
Bastando apenas alterar a propriedade `maxErrors: number`:
```ts
// ...
ErrorValidationModule.forRoot({
  maxErrors: 1, // ou null para mostrar todos
  messages: { ... }
})
```


### Desativando a validação de inputs específicos

Também é possível desativar a validação de apenas alguns inputs.
Bastando apenas utilizar a diretiva `ignoreErrorValidation` no input desejado:

```html
<form [formGroup]="form">
  <div>
    <label for="input1">Input com validação: </label>
    <input type="text" formControlName="input1" id="input1"/>
  </div>

  <div>
    <label for="input2">Input sem validação: </label>
    <input type="text" formControlName="input2" id="input2" ignoreErrorValidation/> <!-- Observe a diretiva -->
  </div>
</form>
```
