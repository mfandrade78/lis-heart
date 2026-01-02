import turtle

# esboço do coração
turtle.speed(3) # controle da velocidade do desenho
turtle.bgcolor('black') # cor de fundo (background)
turtle.pensize(3) # espessura da caneta

# movimento de curvatura do coração
def func():
    for i in range(200):
        turtle.right(1) # rotação suave
        turtle.forward(1) # movimento

# filtro de cor da caneta
turtle.color('blue', 'cyan')
turtle.begin_fill()

# desenhar formato coração
turtle.left(140)
turtle.forward(111.65) # desenha linha diagonal esquerda
func() # desenha curva esquerda
turtle.left(120)
func() # desenha curva direita
turtle.forward(111.65) # desenha linha diagonal direita

turtle.end_fill() # preenche o coração com a cor
turtle.hideturtle() # esconde o cursor da caneta
turtle.done()   # finaliza o desenho
