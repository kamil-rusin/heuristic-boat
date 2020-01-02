# Heuristic boat

Wizualizacja wyznaczania optymalnego kąta trasy łodzi. TODO

Autorzy: Bartłomiej Szlachta, Kamil Rusin, Kornel Fox

##Proste Przeszukiwanie Lokalne

###Wprowadzenie
Jest to proces iteracyjny, który przemieszcza się w przestrzeni od początkowego rozwiązania
do kolejnego według ustalonej reguły. Generuje on nowe rozwiązania randomistycznie, dokładniej
 mówiąc agenci w sąsiedztwie są generowane losowo według współczynnika sąsiedztwa. Każdy 
 start algorytmu po takiej samej liczbie kroków otrzymuje inny rezultat.
 
###Algorytm
W naszym problemie algorytm został zaimplementowany następująco. 
Znajduje on najlepszy kąt, pod którym łódka przebędzie najmniejszą odległość do punktu
docelowego. Pod uwagę brane są współczynniki takie jak: 
- początkowy kąt łódki względem celu,
- prędkość łódki,
- prędkość nurtu rzeki,
- szerokość rzeki,
- odległość do punktu docelowego w linii prostej,
- ilość iteracji algorytmu,
- ilość agentów w sąsiedztwie w danej iteracji,
- współczynnik sąsiedztwa.

Wszystkie parametry są ustalane przez użytkownika.

Pseudokod:
```{tidy=FALSE, eval=FALSE, highlight=FALSE }
najlepszy_kąt = kąt_początkowy

while(ilość iteracji < maksymalna ilość iteracji)
    najlepsza_wartość = funkcja_celu(najlepszy kąt)
    for(ilość agentów)
        agent = wygenerowanie nowego kąta
        if(agent znajduje się w granicach (0,180) stopni)
        if(funkcja_celu(agent) < obecne tymczasowe rozwiązanie)
            tak: ten kąt staje się tymczasowym najlepszym kątem
    if(tymczasowe rozwiązanie < najlepsze rozwiązanie)
        tak: kąt staje się najlepszym rozwiązaniem
    ilość iteracji++

zwróć:
    historia najlepszych kątów i historia wartości funkcji celu
```