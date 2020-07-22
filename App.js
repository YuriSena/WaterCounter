import React, {Component} from 'react';
import {View, ImageBackground, StyleSheet, Text, Button} from 'react-native';

export default class WaterCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {consumido: 0, status: 'Ruim', pct: 0};

    this.beberAgua = this.beberAgua.bind(this);
    this.atualizar = this.atualizar.bind(this);
    this.zerarContador = this.zerarContador.bind(this);
  }

  atualizar() {
    let s = this.state;
    s.pct = Math.floor((s.consumido / 2000) * 100);

    if (s.pct >= 100 && s.pct < 200) {
      s.status = 'Bom';
    } else if (s.pct >= 200) {
      s.status = 'Muito bom';
    } else if (s.pct >= 50 && s.pct < 100) {
      s.status = 'Razoável';
    } else {
      s.status = 'Ruim';
    }
    this.setState(s);
  }

  beberAgua() {
    let s = this.state;
    s.consumido += 200;
    this.setState(s);

    this.atualizar();
  }

  zerarContador() {
    let s = this.state;
    s.consumido = 0;
    s.status = 'Ruim';
    s.pct = 0;
    this.setState(s);
  }

  render() {
    return (
      <View style={styles.body}>
        <ImageBackground
          source={require('./images/waterbg.png')}
          style={styles.bgImage}>
          <View>
            <View style={styles.infoArea}>
              <View style={styles.area}>
                <Text style={styles.areaTitulo}>Meta</Text>
                <Text style={styles.areaDado}>2000ml</Text>
              </View>

              <View style={styles.area}>
                <Text style={styles.areaTitulo}>Consumido</Text>
                <Text style={styles.areaDado}>{this.state.consumido}ml</Text>
              </View>

              <View style={styles.area}>
                <Text style={styles.areaTitulo}>Status</Text>
                <Text style={styles.areaDado}>{this.state.status}</Text>
              </View>
            </View>

            <View style={styles.pctArea}>
              <Text style={styles.pctText}>{this.state.pct}%</Text>
            </View>
            <View style={styles.btnArea}>
              <Button
                title="Beber 200ml"
                onPress={() => {
                  this.beberAgua();
                }}
              />
            </View>
            <View style={styles.btnArea}>
              <Button
                title="Zerar Contador"
                onPress={() => {
                  this.zerarContador();
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 20,
  },
  bgImage: {
    flex: 1,
    width: null,
  },
  infoArea: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 70,
  },
  area: {
    flex: 1,
    alignItems: 'center',
  },
  areaTitulo: {
    color: '#45b2fc',
    fontSize: 15,
  },
  areaDado: {
    color: '#2b4274',
    fontSize: 15,
    fontWeight: 'bold',
  },
  pctArea: {
    marginTop: 150,
    alignItems: 'center',
  },
  pctText: {
    fontSize: 70,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  btnArea: {
    marginTop: 30,
    alignItems: 'center',
  },
});
