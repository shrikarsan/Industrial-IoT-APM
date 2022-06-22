import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import client from '../api/client';
import {useState} from 'react';

const Alerts = () => {
  const [Items, setItems] = useState();
  const [count, setCount] = useState();

  const getItems = async () => {
    try {
      const res = await client.get('/alerts');
      if (res.data.success) {
        setItems(res.data.data);
        setCount(res.data.count);
      } else {
        console.log('Failed');
        console.log(count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const Item = ({description}) => (
    <View style={styles.item}>
      {/* <Text style={styles.Itemtext}>{id}</Text> */}
      <Text style={styles.Itemtext}>{description}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item description={item.description} />;
  return (
    <View style={styles.root}>
      <Text style={styles.CollectionTitle}></Text>
      <View style={styles.Collection}>
        <View style={styles.infoPanelCol}>
          <Text style={styles.text2}>Total Alerts - {count}</Text>
        </View>
      </View>
      <View style={styles.collectionSection}>
        {/* <View style={styles.AlertTextcont}>
          <Text style={styles.AlertText}>Shipment ID</Text>
          <Text style={styles.AlertText2}>COD Amount</Text>
        </View> */}
        <View>
          <FlatList
            data={Items}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  CollectionTitle: {
    fontFamily: 'Montserrat-Medium',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    padding: 10,
    paddingBottom: 5,
    flex: 1,
  },
  Collection: {
    flex: 4,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 5,
  },
  infoPanelCol: {
    alignContent: 'center',
    backgroundColor: '#213571',
    borderRadius: 10,
    padding: 10,
    width: 300,
    height: 80,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text1: {
    color: '#fff',
    fontFamily: 'SF-Pro-Displa-Bold',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  text2: {
    color: '#fff',
    fontFamily: 'SF-Pro-Displa-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  collectionSection: {
    flex: 12,
    padding: 20,
  },
  AlertText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
  },
  AlertText2: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'right',
  },
  AlertTextcont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  Itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontStyle: 'normal',
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#C3E4F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#C3E4F5',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 10,
  },
});
export default Alerts;
