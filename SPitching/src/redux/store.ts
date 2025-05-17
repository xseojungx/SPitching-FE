import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/auth.slice';
import gestureFeedbackReducer from './slices/gestureFeedback.slice';
import practiceReducer from './slices/practice.slice';

import { combineReducers } from 'redux';

// persist 설정 (practice 슬라이스만 persist)
const practicePersistConfig = { key: 'practice', storage, whitelist: ['practiceId'] };

const rootReducer = combineReducers({
  auth: authReducer,
  gestureFeedback: gestureFeedbackReducer,
  practice: persistReducer(practicePersistConfig, practiceReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }), // persist 때문에 필요
});

export const persistor = persistStore(store);

// 타입들 export
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
