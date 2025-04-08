'use client'

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styles from '@/styles/css/artist/createMarket.module.css'
import dayjs, { Dayjs } from 'dayjs';


interface SelectMarketDateProps {
    startDate: string | null;
    endDate: string | null;
    handleStartDateChange: (date: Dayjs | null) => void;
    handleEndDateChange: (date: Dayjs | null) => void;
    isOpen: boolean;
}


const SelectMarketDate = ({startDate, endDate, handleStartDateChange, handleEndDateChange, isOpen}: SelectMarketDateProps) => {
    

    
    return (
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={styles.datePicker}>
                <DatePicker 
                    label={'마켓 오픈날짜'} 
                    views={['year', 'month', 'day']} 
                    format='YYYY-MM-DD (ddd)'
                    disabled={isOpen}
                    sx={{ 
                        width: '220px',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'pink',
                            borderRadius: '8px'
                        },
                        // 비활성화 시 스타일 적용
                        '&.Mui-disabled': {
                            backgroundColor: '#f5f5f5',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#e0e0e0'
                            }
                        }
                    }}
                    value={dayjs(startDate)}
                    onChange={handleStartDateChange}
                />
                <DatePicker 
                    label={'마켓 종료날짜'} 
                    views={['year', 'month', 'day']} 
                    format='YYYY-MM-DD (ddd)'
                    disabled={isOpen}
                    sx={{ 
                        width: '220px',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'pink',
                            borderRadius: '8px'
                        },
                        // 비활성화 시 스타일 적용
                        '&.Mui-disabled': {
                            backgroundColor: '#f5f5f5',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#e0e0e0'
                            }
                        }
                    }}
                    value={dayjs(endDate)}
                    onChange={handleEndDateChange}
                />
            </div>
        </LocalizationProvider>
    </div>
    )
}

export default SelectMarketDate;