import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';



const { width } = Dimensions.get('window');

export default function Book() {
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [slotTime, setSlotTime] = useState(0);

  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');
    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 4 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');
        return {
            month: date.format('MMM'),
            weekday: date.format('ddd'),
            date: date.toDate(),
        };
      });
    });
  }, [week]);

  const time = [
    { bookingTime: '9.00-12.00 น.', confirmTime: '08.30 - 09.00 น.' },
    { bookingTime: '12.00-15.00 น.', confirmTime: '11.30 - 12.00 น.' },
    { bookingTime: '15.00-18.00 น.', confirmTime: '14.30 - 15.00 น.' },
    { bookingTime: '18.00-21.00 น.', confirmTime: '17.30 - 18.00 น.' },
    { bookingTime: '21.00-00.00 น.', confirmTime: '20.30 - 21.00 น.' },
    { bookingTime: '00.00-03.00 น.', confirmTime: '23.30 - 00.00 น.' },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
            <Text style={styles.title}>Booking</Text>
            <Image source={require("../../assets/book-whiteIcon.png")} 
            style={{ width: 50, height: 50 }}/>
        </View>

        {/* carlendar */}
        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={ind => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, 'week').toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}>
            {weeks.map((dates, index) => (
              <View
                style={[styles.itemRow, { paddingHorizontal: 16 }]}
                key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}>
                        
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#263959',
                            borderColor: '#263959',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.date.getDate()}
                        </Text>
                        <Text
                          style={[
                            styles.itemMonth,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.month}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>
        {/* timeSlot */}
        <View style={{ flex: 1, }}>
          {/* <Text style={styles.subtitle}>{value.toDateString()}</Text> */}
          <View style={styles.placeholder}>
            <View style={styles.placeholderInset}>
            <Text style={styles.subtitle}>Available Periods</Text>
              {time.map((slot, index) => (
                <View key={index} style={styles.timeslotContainer}>
                    <View>
                        <Text style={{fontSize: 25,}}>{slot.bookingTime}</Text>
                        <Text style={{fontSize: 10,}}>Open confirm {slot.confirmTime}</Text>
                    </View>
                    <AntDesign name="pluscircleo" size={24} color="black" />
                </View>
                
              ))}
            </View>
          </View>
          
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 24,
    paddingTop: 24,
  },
  header: {
    paddingHorizontal: 16,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    maxHeight: 130,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    zIndex: 1,
    
  },
  subtitle: {
    fontSize: 27,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  item: {
    flex: 1,
    height: 90,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 23,
    borderColor: '#D9D9D9',
    backgroundColor: '#d9d9d9',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  itemWeekday: {
    fontSize: 15,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemMonth: {
    fontSize: 15,
    fontWeight: '300',
    color: '#6D6D6D',
  },
  itemDate: {
    fontSize: 30,
    fontWeight: '600',
    color: '#111',
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: '100%',//400
    marginTop: -75,
    backgroundColor: 'fff',
  },
  placeholderInset: {
    borderTopLeftRadius:60,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor:'#fff',
    width: width,
    marginRight:-10,
    paddingHorizontal: 16,
    paddingTop: 70,
  },
  timeslotContainer: {
    marginBottom: 8,
    paddingHorizontal: 18,
    paddingVertical:12,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height: 100, 
    
  },
  timeslot: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  
});
