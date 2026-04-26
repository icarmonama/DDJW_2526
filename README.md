# Memory Canvas

## Introducció

Aquest projecte és un joc de memòria desenvolupat amb JavaScript i Canvas. El jugador ha de trobar grups de cartes iguals fins completar la partida.

El treball s'ha fet a partir del joc desenvolupat a classe i s'han afegit noves funcionalitats com la mida de grup, dos modes de joc, puntuacions, guardat i càrrega de partides.

## Descripció del disseny del joc

El joc té dos modes principals:

### Mode 1

El mode 1 és una partida normal. El jugador pot configurar les opcions abans de jugar:

- número de cartes
- dificultat
- mida de grup

La mida de grup permet jugar amb parelles, trios o quartets.

### Mode 2

El mode 2 és un mode progressiu. Quan el jugador supera un nivell, es carrega un nou nivell amb més dificultat.

La progressió del mode 2 funciona augmentant el nombre de grups i canviant la mida de grup segons el nivell:

- primers nivells: parelles
- nivells intermedis: trios
- nivells avançats: quartets

També es manté una puntuació acumulada del mode 2.

## Parts més rellevants de la implementació

El joc utilitza Canvas per dibuixar les cartes i controlar la pantalla de partida. La lògica principal del joc es troba en els fitxers JavaScript.

Les opcions del joc es guarden amb `localStorage`, de manera que es mantenen entre partides. També s'utilitza `sessionStorage` per controlar dades temporals com el mode de joc, el nivell actual o la partida carregada.

El sistema de guardat permet desar partides en local i carregar-les des d'una pantalla de partides guardades. Si es carrega una partida i es torna a guardar, es pot sobreescriure la mateixa partida.

El rànquing de puntuacions guarda l'àlies del jugador i la puntuació obtinguda en el mode 2.

## Conclusions i problemes trobats

Durant el desenvolupament s'han hagut d'adaptar diferents parts del joc original. Un dels punts més importants ha estat modificar la lògica de parelles perquè també funcionés amb trios i quartets.

També s'ha ajustat la distribució de cartes al Canvas, ja que quan hi havia moltes cartes calia repartir-les en diverses files. Un altre problema ha estat gestionar correctament el guardat i la càrrega de partides, especialment quan una partida carregada es tornava a guardar.

Finalment, s'ha millorat l'estil visual de la web perquè el menú, les opcions, la pantalla de càrrega i la partida tinguin un aspecte més coherent.
