Descritos abaixo estão as 3 interações de problemas principais verificados através de IA para resolução:



**INTERAÇÃO INICIAL:**



**O que foi solicitado para a IA**

Foi solicitado auxílio para corrigir um problema na atualização da direção do foguete após a geração de uma nova rota. O comportamento observado era que a linha azul que representa a trajetória nova e a imagem ícone do foguete apontavam para direções diferentes após o usuário aceitar uma nova rota.

Mesmo após a criação de uma nova rota, a linha azul era atualizada corretamente, porém a imagem do foguete permanecia utilizando um ângulo diferente, fazendo com que não estivessem em sincronia.



**O que a IA retornou**

A IA identificou que o problema estava sendo causado pelo uso de duas variáveis diferentes para controlar a orientação do foguete e da imagem.

estava:

*rotaLinha.style.transform = `rotate(${anguloRota}deg)`;*

*fogueteImg.style.transform = `rotate(${anguloFoguete}deg)`;*

A variável anguloRota era recalculada sempre que a função de geração de rota era executada, porém a imagem do foguete continuava utilizando a variável anguloFoguete, que armazenava o valor padrão de nascimento e não era atualizada juntamente com a nova rota. A correção sugerida foi utilizar o mesmo valor calculado para ambos os elementos.



**O que foi alterado ou rejeitado e o motivo**

Foi aceito e alterado a correção no script.js, a alteração foi realizada para garantir que a imagem do foguete e a linha azul da rota permaneçam visualmente sincronizadas sempre que uma nova trajetória for gerada ou aceita pelo usuário.



**OUTRA INTERAÇÃO:**

O que foi solicitado para a IA

Foi solicitado auxílio para corrigir um problema em que, após o sorteio de uma nova rota, o foguete ainda podia acabar seguindo na mesma direção do objeto ameaçador. O comportamento esperado era que a nova rota sempre fosse gerada em uma direção segura e diferente da ameaça, por isso foi solicitado auxílio para o cálculo necessário para isso acontecer.



**O que a IA retornou**

Foi sugerido calcular a diferença angular entre anguloRota e anguloObjeto e definir uma margem mínima de segurança (anguloMinimoSeguro). Caso a diferença fosse menor que esse limite, a rota deveria ser descartada e um novo ângulo deveria ser sorteado.



**O que foi alterado ou rejeitado e o motivo**

Foi alterada a lógica de geração das rotas para que o valor de anguloRota fosse comparado com anguloObjeto antes de ser aplicado ao foguete. Rotas que apontavam para a mesma direção da ameaça passaram a ser rejeitadas automaticamente por não passarem do if e um novo ângulo passou a ser sorteado.

A alteração foi realizada para garantir que o sistema realmente gerasse rotas de desvio, evitando trajetórias que mantivessem o foguete em direção ao objeto ameaçador, já que isso iria contra o propósito do projeto.



**OUTRA INTERAÇÃO:**

O que foi solicitado para a IA

Foi solicitado auxílio para corrigir um problema na geração de rotas seguras do foguete. Em alguns testes, mesmo quando a rota estava distante de qualquer objeto potencialmente ameaçador, o sistema identificava como perigosa. Em outros casos, rotas muito próximas da ameaça eram consideradas seguras.



**O que a IA retornou**

A IA identificou que o problema estava relacionado à falta de normalização angular. O código comparava diretamente os valores de anguloRota e anguloObjeto utilizando uma subtração simples, sem considerar que os ângulos são circulares.

Por exemplo, quando a rota estava em 350° e o objeto ameaçador em 10°, o cálculo retornava uma diferença de 340°. Entretanto, geometricamente os dois ângulos estão separados por apenas 20°.

Por causa desse erro, o sistema calculava errado o risco fazendo com que objetos próximos não fossem reconhecidos. Assim, algumas trajetórias perigosas eram aceitas afetando diretamente a lógica de desvio de ameaças do projeto.

A IA recomendou normalizar a diferença angular para que o cálculo sempre retornasse a menor distância possível entre dois ângulos antes de aplicar as verificações de segurança.



**O que foi alterado ou rejeitado e o motivo**

Foi adicionada uma etapa de normalização da diferença entre anguloRota e anguloObjeto antes da validação da rota através da criação de uma função para normalização de todos os ângulos comparados entre si. A alteração foi realizada porque o cálculo anterior não considerava o cálculo completo de diferença dos ângulos do ponto de vista geométrico. Após a correção, a comparação passou a representar corretamente a proximidade entre a rota do foguete e a direção da ameaça.





