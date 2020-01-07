# Heuristic boat

Strona internetowa prezentująca rozwiązanie problemu optymalnej trasy łodzi przez rzekę w linii prostej. Optymalny kąt, pod jakim ma wypłynąć łódź, wyznaczany jest heurystycznie, a wyniki prezentowane są w animacji na ekranie.

Autorzy: Bartłomiej Szlachta, Kamil Rusin, Kornel Fox

## Opis zagadnienia

Celem łodzi jest dotarcie do wybranego punktu na przeciwległym brzegu rzeki, pokonując prąd rzeki. Aby tego dokonać, należy wybrać optymalny kąt początkowy kierunku łodzi względem brzegu - taki kąt, który zapewni osiągnięcie tego celu.
 
Może się zdarzyć, że niemożliwym jest dopłynięcie do wyznaczonego punktu (dzieje się tak, gdy prąd rzeki jest silniejszy od siły napędu łodzi). Wtedy celem jest dotarcie tak blisko wyznaczonego celu, jak to jest możliwe.

Istnieje możliwość wyboru parametrów zagadnienia:
- inicjalnego kąta trasy łodzi względem brzegu rzeki (w stopniach)
- prędkości łodzi (w metrach na sekundę)
- prędkości nurtu rzeki (w metrach na sekundę), rzeka płynie od prawej do lewej
- szerokości rzeki (w metrach)
- położenia punktu docelowego (w metrach), na osi leżącej na przeciwległym brzegu rzeki, na której punkt 0 leży naprzeciwko łodzi

## Modelowanie matematyczne

Celem modelowania matematycznego jest uzyskanie tzw funkcji celu - funkcji jednoargumentowej, która dla podanego kąta wyznacza odległość punktu docelowego od punktu, do którego łódź by dotarła płynąc pod zadanym kątem.

Wymienione wyżej parametry są wystarczające do wyznaczenia rezultatu podróży łodzi.

Kolejno wykonywane kroki:
1. Wyznaczenie wektora, pod jakim łódź 'chce' płynąć (czyli bez uwzględnienia prądu rzeki)
2. Wyznaczenie wektora, pod którym łódź popłynie w rzeczywistości (czyli uwzględniając prąd rzeki)
3. Wyznaczenie lokalizacji punktu, w którym łódź dopłynie do brzegu
4. Wyznaczenie odległości od punktu docelowego

## Algorytm heurystyczny

### Wprowadzenie
Wybranym algorytmem do rozwiązania problemu jest Proste Przeszukiwanie Lokalne - proces iteracyjny, który przemieszcza się w przestrzeni od początkowego rozwiązania
do kolejnego według ustalonej reguły. Generuje on nowe rozwiązania randomistycznie, dokładniej
 mówiąc agenci w sąsiedztwie są generowane losowo według współczynnika sąsiedztwa. Każdy 
 start algorytmu po takiej samej liczbie kroków otrzymuje inny rezultat.
 
### Algorytm
W naszym problemie algorytm został zaimplementowany następująco. 
Znajduje on najlepszy kąt, pod którym łódka przebędzie najmniejszą odległość do punktu
docelowego. Pod uwagę brane są również dodatkowe współczynniki algorytmu: 
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
