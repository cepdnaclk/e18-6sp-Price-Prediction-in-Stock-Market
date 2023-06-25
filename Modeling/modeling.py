def model_func(data , name):
  # Columns that should not be in attributes
  y_columns = ['next-open', 'next-close', 'next-high', 'next-low']

  # Drop the date and time
  data = data.drop(['date', 'time'], axis=1)

  #  Preparing X and Y data sets
  X = data.drop(y_columns, axis=1)
  Y = data[y_columns]

  # Creating the Neural Network
  model = tf.keras.Sequential([
    tf.keras.layers.InputLayer(input_shape=(6,), name="Num_input"),
    tf.keras.layers.BatchNormalization(axis= -1, name='Num_normalization'),
    tf.keras.layers.Dense(128, name='dense_1_num', activation=tf.nn.relu),
    tf.keras.layers.Dense(64, name='dense_2_num', activation=tf.nn.relu),
    tf.keras.layers.Dense(16, name='dense_3_num', activation=tf.nn.relu),
    tf.keras.layers.Dense(8, name='dense_4_num', activation=tf.nn.relu),
    tf.keras.layers.Dense(1, name='output'),
  ])

  # Chosing optimizer and loss function
  # Loss function
  loss_function = tf.keras.losses.MeanSquaredError()

  # Select optimizer
  optimizer = tf.keras.optimizers.Adam(learning_rate=0.01, clipvalue=1)

  # Compling
  model.compile(optimizer=optimizer, loss=loss_function, metrics=['mae'])

  # Batch size and epoch size determination
  BATCH_SIZE = 32

  # Fitting the model
  history = model.fit(X, Y, batch_size=BATCH_SIZE, epochs=15, steps_per_epoch=math.ceil(X.shape[0]/BATCH_SIZE))

  # Model name 
  model_name = name + '.pkl'

  # Import the model
  pickle.dump(model, open(model_name, 'wb'))

  # Get the model history for plotting and analysing
  return history