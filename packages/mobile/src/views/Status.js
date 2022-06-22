import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import client from '../api/client';
import {useState} from 'react';

const Status = () => {
  const [Items, setItems] = useState();
  const [count, setCount] = useState();

  const getItems = async () => {
    try {
      const res = await client.get('/machines');
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
  const Item = ({id, name, status}) => (
    <View style={styles.item}>
      <Text style={styles.Itemtext}>{id}</Text>
      <Text style={styles.Itemtext}>{name}</Text>
      <Text style={styles.Itemtext2}>{status}</Text>
    </View>
  );

  const renderItem = ({item}) => (
    <Item id={item.id} name={item.name} status={item.status} />
  );
  return (
    <View style={styles.root}>
      <Text style={styles.PageTitle}></Text>
      <View style={styles.Page}>
        <View style={styles.infoPanelCol}>
          <Text style={styles.text2}>No of Machines - {count}</Text>
        </View>
      </View>
      <View style={styles.collectionSection}>
        <View style={styles.AlertTextcont}>
          <Text style={styles.AlertText}>Machine</Text>
          <Text style={styles.AlertText}>Name</Text>
          <Text style={styles.AlertText2}>Status</Text>
        </View>
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
  PageTitle: {
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
  Page: {
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
  },
  Itemtext2: {
    fontFamily: 'Montserrat-Medium',
    fontStyle: 'normal',
    color: '#000000',
    textAlign: 'center',
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
export default Status;
