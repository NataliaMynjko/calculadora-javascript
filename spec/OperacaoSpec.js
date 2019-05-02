var digitarConta = function(conta){
  for(var i = 0; i < conta.length; i++){
    $("button:contains("+conta[i]+")").click();
  }
}

describe("Operações", function() {
  
  beforeEach(function() {
    $("#resultado").val("")
  });

  afterEach(function(){
    $("#resultado").val("");
  });

  describe("Botão de Resultado", function(){
    
    it("deve responder corretamente a soma", function(){
      var num1 = Math.random() * 10;
      var num2 = Math.random() * 10;
      var conta = num1+"+"+num2;
      digitarConta(conta)
      $("button.resultar").click();
      expect(parseFloat($("#resultado").val())).toEqual(num1+num2);
    });

    it("deve responder corretamente a subtração", function(){
      var num1 = Math.random() * 10;
      var num2 = Math.random() * 10;
      var conta = num1+"-"+num2;
      digitarConta(conta)
      $("button.resultar").click();
      expect(parseFloat($("#resultado").val())).toEqual(num1-num2);
    });

    it("deve responder corretamente a multiplicação", function(){
      var num1 = Math.random() * 10;
      var num2 = Math.random() * 10;
      var conta = num1+"*"+num2;
      digitarConta(conta)
      $("button.resultar").click();
      expect(parseFloat($("#resultado").val())).toEqual(num1*num2);
    });

    it("deve responder corretamente a multiplicação", function(){
      var num1 = Math.random() * 10;
      var num2 = Math.random() * 10;
      var conta = num1+"/"+num2;
      digitarConta(conta)
      $("button.resultar").click();
      expect(parseFloat($("#resultado").val())).toEqual(num1/num2);
    });

    it("deve colocar a mensagem 'Erro de operação' caso não tenha número a direita.", function(){
      //$("#resultado").val("5/");
      $("button:contains(5)").click();
      $("button:contains(/)").click();
      $("button.resultar").click();
      expect($("#resultado").val()).toBe("Erro de operação");
    });

    it("deve manter o número caso só haja o número da esquerda", function(){
      digitarConta("57.5");
      $("button.resultar").click();
      expect($("#resultado").val()).toBe("57.5");
    });

  });

  describe("Botões de Operação", function(){

    describe("Clique nos botões", function(){

      it("Não deve adicionar operação se não houver números.", function(){
        $("button.operacao.somar").click();
        expect($("#resultado").val().replace(/\s+/g,'')).toBe("");
      });

      it("deve adicionar a operação de soma se já houver número e clicar no botão soma", function(){
        $("button:contains(5)").click();
        $("button.operacao.somar").click();
        expect($("#resultado").val().replace(/\s+/g,'').substring(1)).toBe("+");
      });

      it("deve adicionar a operação de subtração se já houver número e clicar no botão subtração", function(){
        $("button:contains(5)").click();
        $("button.operacao.subtrair").click();
        expect($("#resultado").val().replace(/\s+/g,'').substring(1)).toBe("-");
      });

      it("deve adicionar a operação de multiplicação se já houver número e clicar no botão multiplicação", function(){
        $("button:contains(5)").click();
        $("button.operacao.multiplicar").click();
        expect($("#resultado").val().replace(/\s+/g,'').substring(1)).toBe("*");
      });

      it("deve adicionar a operação de divisão se já houver número e clicar no botão divisão", function(){
        $("button:contains(5)").click();
        $("button.operacao.dividir").click();
        expect($("#resultado").val().replace(/\s+/g,'').substring(1)).toBe("/");
      });

      it("não deve adicionar operação se já houver operação antes.", function(){
        $("button:contains(5)").click();
        $("button.operacao.somar").click();
        $("button.operacao.dividir").click();
        expect($("#resultado").val().replace(/\s+/g,'')).toBe("5+");
        $("#resultado").val('')

        $("button:contains(5)").click();
        $("button.operacao.subtrair").click();
        $("button:contains(3)").click();
        $("button.operacao.somar").click();
        expect($("#resultado").val().replace(/\s+/g,'')).toBe("5-3");
        $("#resultado").val('')
      });
    });

  });

  describe("Botões de Número", function(){

    it("Clicar no botão de números deve adicionar o número no botão (incluindo o .)", function(){
      $("button.numero").each(function(){
        $(this).click();
        expect($("#resultado").val().replace(/\s+/g,'')).toBe($(this).text());
        $("#resultado").val("");
      });
    })

    it("não deve adicionar dois pontos seguidos.", function(){
      $("button.numero:contains(.)").click();
      expect($("#resultado").val().replace(/\s+/g,'')).toBe(".");
      $("button.numero:contains(.)").click();
      expect($("#resultado").val().replace(/\s+/g,'')).toBe(".");
    });

    it("só deve permitir um ponto por número (esquerda ou direita)", function(){
      $("button:contains(2)").click();
      $("button:contains(5)").click();
      $("button.numero:contains(.)").click();
      expect($("#resultado").val().replace(/\s+/g,'')).toBe("25.");
      $("#resultado").val("");

      $("button:contains(2)").click();
      $("button:contains(5)").click();
      $("button.numero:contains(.)").click();
      $("button:contains(3)").click();
      $("button.numero:contains(.)").click();
      expect($("#resultado").val().replace(/\s+/g,'')).toBe("25.3");
      $("#resultado").val("");

      $("button:contains(2)").click();
      $("button:contains(5)").click();
      $("button.numero:contains(.)").click();
      $("button:contains(3)").click();
      $("button:contains(-)").click();
      $("button:contains(3)").click();
      $("button.numero:contains(.)").click();
      expect($("#resultado").val().replace(/\s+/g,'')).toBe("25.3-3.");
      $("#resultado").val("");

      $("button:contains(2)").click();
      $("button:contains(5)").click();
      $("button.numero:contains(.)").click();
      $("button:contains(3)").click();
      $("button:contains(-)").click();
      $("button:contains(3)").click();
      $("button.numero:contains(.)").click();
      $("button:contains(4)").click();
      $("button.numero:contains(.)").click();
      expect($("#resultado").val().replace(/\s+/g,'')).toBe("25.3-3.4");      
      $("#resultado").val("");
    });

  });

});
