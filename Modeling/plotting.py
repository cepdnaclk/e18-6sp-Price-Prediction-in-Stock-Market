# Plot the error
def plot_loss(history, name):
  plt.plot(history.history['loss'], label='loss')
  plt.xlabel('Epoch')
  plt.ylabel('Error [MSE]')
  plt.legend()
  plt.grid(True)

  # Plot name
  plot_name = name+ '.png'
  # Saving the figure
  plt.savefig(plot_name)